import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) :
Promise<NextResponse> => {
    const query = req.nextUrl.searchParams
    const gender = query.get("gender");
    const birthdate = query.get("birthdate");
    const month = query.get("month");
    const time = query.get("time");
    console.log(gender, birthdate, month, time)
    const res = await fetch(`https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0*gender=${gender}&birth=${birthdate}&solarCal=${month}&time=${time}`)
    console.log(res)
    return NextResponse.json({error: "데이터가 없음"})

    //https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver
}