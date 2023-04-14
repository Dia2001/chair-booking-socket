import React, { Component, useState, useEffect, useRef } from 'react';
import './App.css';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

function Seat() {
    const [seats, setSeats] = useState([])
    const [stompClient, setStompClient] = useState({})
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        const connect = async () => {
            const socket = new SockJS('http://localhost:9999/seat-booking');
            const client = Stomp.over(socket);
            client.connect({}, () => {
                client.subscribe('/topic/seat', (data) => {
                    const seat = JSON.parse(data.body);
                    setSeats(prev => 
                        prev.reduce((arr, curr) => {
                            if (curr.id === seat.id) {
                                curr.available = seat.available
                            }
                            return [...arr, curr]
                        }, [])
                    )
                });
                client.subscribe('/topic/seats', (data) => {
                    const seats = JSON.parse(data.body);
                    setSeats(seats);
                });
                setIsInit(true);
            })
            setStompClient(client);
        }
        connect()
    }, [])

    useEffect(() => {
        if (isInit) {
            setTimeout(() => {
                stompClient.send("/app/seats", {}, '')
            }, 500)
        }
    }, [isInit])

    const onClickSeat = (id) => {
        const seat = {
            id: id,
            available: false
        }
        stompClient.send("/app/seat", {}, JSON.stringify(seat))
    }

    return (
        <div className="App">
            <h1>Seat Booking App</h1>
            {seats.map((seat, index) => (
                <button
                    style={{
                       cursor: !seat.available?'no-drop':'alias',
                       backgroundColor: seat.available? 'AliceBlue':'DarkRed'
                    }} 
                    onClick={() => onClickSeat(seat.id)}
                    disabled={!seat.available}>
                    Seat id: {seat.id}
                </button>
            ))}
        </div>
    )
}

export default Seat