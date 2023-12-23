'use client'
import React, {useState} from 'react';

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}


export default function Home() {
  
  const [gender, setGender] = useState<string>("")
  const [birthDate, setBirthDate] = useState<string>("")
  const [month, setMonth] = useState<string>("1")
  const [time, setTime] = useState<string>("")

  const [resultToday, setResultToday] = useState<today | null>(null); 
  const [resultTomorrow, setResultTomorrow] = useState(null)
  const [resultMonth, setResultMonth] = useState(null)

  const fetchData = async () => {
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`)
    const data = await res.json()
    setResultToday(data.result.day)
    setResultTomorrow(data.result.tomorrow)
    setResultMonth(data.result.month)
  }

  const birthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // input값 그대로 가져오는 법
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
      setBirthDate(value)
    }
  }

  return (
    <>
      <div className="w-2/3 mx-auto border-2 rounded-md p-5">
        <h3 className='text-center text-2xl font-bold mb-3'>오늘의 운세</h3>
        <div className='flex items-center gap-x-3 mb-3'>
          <span>성별</span>
          <button className={`border py-0.5 px-3 rounded-md ${gender === 'm' ? 'bg-green-500 text-white' : ''}`} onClick={()=>setGender("m")}>남자</button>
          <button className={`border py-0.5 px-3 rounded-md ${gender === 'f' ? 'bg-green-500 text-white' : ''}`} onClick={()=>setGender("f")}>여자</button>
        </div>
        <div className='flex gap-x-3 mb-3'>
          <span>생년월일</span>
          <input className='border rounded-md' type="text" onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' />
        </div>
        <div className='flex gap-x-3 mb-3'>
          <span>양력, 음력</span>
          <select className='border rounded-md' value={month} onChange={(e)=>{setMonth(e.target.value)}}>
            <option value="1">양력</option>
            <option value="2">음력 평달</option>
            <option value="3">음력 윤달</option>
          </select>
        </div>
        <div className='flex gap-x-3 mb-3'>
          <span>태어난 시간</span>
          <select className='border rounded-md' value={time} onChange={(e)=>setTime(e.target.value)}>
            <option value="">모름</option>
            <option value="0">23:30 ~ 01:29</option>
            <option value="1">01:30 ~ 03:29</option>
            <option value="2">03:30 ~ 05:29</option>
            <option value="3">05:30 ~ 07:29</option>
            <option value="4">07:30 ~ 09:29</option>
            <option value="5">09:30 ~ 11:29</option>
            <option value="6">11:30 ~ 13:29</option>
            <option value="7">13:30 ~ 15:29</option>
            <option value="8">15:30 ~ 17:29</option>
            <option value="9">17:30 ~ 19:29</option>
            <option value="10">19:30 ~ 21:29</option>
            <option value="11">21:30 ~ 23:29</option>
          </select>
        </div>
        <button className='border px-5 py-4 rounded-md w-full bg-green-200 font-bold' onClick={fetchData}>확인</button>
      </div>

      {
        resultToday && (
          <>
            {resultToday.content.map((item, idx) => (
              <div className="w-2/3 mx-auto">
                <div key={idx} className='border my-5'>
                  <h3 className='text-bold text-lg border-b bg-green-300 pl-2 py-1'>{item.name}</h3>
                  <p className='pl-2 py-2'>{item.desc}</p>
                </div>
              </div>
            ))}
          </>
        )
      }

    </>
  )
}
