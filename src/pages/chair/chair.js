import React, { Component, useState, useEffect, useRef } from 'react';
import "../../styles/chair.scss"
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

function Chair() {
    const [chairs, setSeats] = useState([])
    const [stompClient, setStompClient] = useState({})
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        const connect = async () => {
            const socket = new SockJS('http://localhost:9999/chair-booking');
            const client = Stomp.over(socket);
            client.connect({}, () => {
                client.subscribe('/topic/chair', (data) => {
                    const chair = JSON.parse(data.body);
                    setSeats(prev => 
                        prev.reduce((arr, curr) => {
                            if (curr.chairId === chair.chairId) {
                                curr.status = chair.status
                            }
                            return [...arr, curr]
                        }, [])
                    )
                });
                client.subscribe('/topic/chairs', (data) => {
                    const chairs = JSON.parse(data.body);
                    setSeats(chairs);
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
                stompClient.send("/app/chairs", {},"9be06f3e-7c8b-4db6-9e41-bfe02b84c407")
            }, 500)
        }
    }, [isInit])

    const onClickSeat = (chairId) => {
        const chair = chairId
        stompClient.send("/app/chair", {}, chairId)
    }

    return (
      <div className="p-5">
      <div className="text-[#000000] text-xl font-bold  pb-10 ">Sau khi chọn ghế các client khác sẽ đóng lại không cho chọn ghế này nữa</div>
        <div className="mx-auto w-[50%] grid grid-rows-10 grid-cols-3 gap-2">
        {chairs.map((chair,index)=>(
            <div>
            <button key={index}
            className="btn"
            style={{
               cursor: !chair.status?'no-drop':'alias',
               backgroundColor: chair.status? '#00CCFF':'#FF6666'
            }} 
            onClick={() => onClickSeat(chair.chairId)}
            disabled={!chair.status}>
             {chair.chairNumber}
        </button>
        </div>
        ))}
          </div>
          </div>
           
    )
}

export default Chair;