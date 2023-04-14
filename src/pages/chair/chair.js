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

// export default Chair

// const Chair = () => { 
//      return(
//         <div class="p-5">
//           <div class="text-[#000000] text-xl font-bold  pb-10 ">Sau khi chọn ghế các client khác sẽ đóng lại không cho chọn ghế này nữa</div>
//             <div class="ml-64 grid grid-cols-3 gap-1">
//               <div class="grid-col">
//                 <button class="btn">1</button>
//                 <button class="btn">2</button>
//                 <button class="btn">3</button>
//                 <button class="btn">4</button>
//                 <button class="btn">5</button>
//                 <button class="btn">6</button>
//                 <button class="btn">7</button>
//                 <button class="btn">8</button>
//                 <button class="btn">9</button>
//                 <button class="btn">10</button>
//               </div>
//               <div class="grid-col">
//                 <button class="btn">11</button>
//                 <button class="btn">12</button>
//                 <button class="btn">13</button>
//                 <button class="btn">14</button>
//                 <button class="btn">15</button>
//                 <button class="btn">16</button>
//                 <button class="btn">17</button>
//                 <button class="btn">18</button>
//                 <button class="btn">19</button>
//                 <button class="btn">20</button>
//               </div>
//               <div class="grid-col">
//                 <button class="btn">21</button>
//                 <button class="btn">22</button>
//                 <button class="btn">23</button>
//                 <button class="btn">24</button>
//                 <button class="btn">25</button>
//                 <button class="btn">26</button>
//                 <button class="btn">27</button>
//                 <button class="btn">28</button>
//                 <button class="btn">29</button>
//                 <button class="btn">30</button>
//               </div>
//           </div>
//         </div>
//      );
// }

export default Chair;