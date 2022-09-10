import Request from '../utils/request'

interface weiboUrl {
  url: string
  params: string
}

const headers = {
  'authority': 'weibo.com',
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'cache-control': 'no-cache',
  'client-version': 'v2.34.95',
  'cookie': 'SINAGLOBAL=5637024106279.256.1659616610558; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whb3ApLh6hiY7XTbPihExL65JpX5KMhUgL.Fo-Xe0e01hn41K.2dJLoI7UCIgSQSGSX; ALF=1694172093; SSOLoginState=1662636094; SCF=AuZr6YLK6spW7aJlPvFGAbMcnY_UKdwWN_aCzxgQLgQGA_I9akl5V6H_6UBxhFBNdvqy_pYNgg0dLdsBSeDM-8o.; SUB=_2A25OHaBuDeRhGeNK6FES-CbFwjWIHXVtapamrDV8PUNbmtAKLW2tkW9NSX9scH2F7QmdVXn0KZi0DYORU1O8wrYw; XSRF-TOKEN=fh-8N14JzS5XHuqgyoSTIKK-; _s_tentry=www.google.com.hk; UOR=login.sina.com.cn,s.weibo.com,www.google.com.hk; Apache=3097431552541.574.1662636485501; ULV=1662636485505:7:1:1:3097431552541.574.1662636485501:1660221904187; WBPSESS=OG9LB6zSOCYHxHOiRZS8AhoYyV4Zv4a_0iGkXmOp_p0o877PvU3T5stHGGewu0arwrMceqVgc3mu_7KhOTbVET-sYhMKuQ1H9TWynd1lIAzmpWFttAZaA_9sc7EoF8CwTI97FSrMzn8pQ-_-vbBJxg==',
  'pragma': 'no-cache',
  'referer': 'https://weibo.com/2516386891/M4Nv2yod8',
  'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'server-version': 'v2022.09.08.2',
  'traceparent': '00-ffecb0d957f569008e47a59d1c362d73-0b849cc8fe9997dd-00',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
  'x-xsrf-token': 'fh-8N14JzS5XHuqgyoSTIKK-',
}

/**
 * 微博url请求数据
 * @param data
 * @returns
 */
export function handleUrlWeibo(data: weiboUrl) {
  return new Request({
    url: data.url,
    method: 'GET',
    params: {
      id: data.params,
    },
    headers,

  })
}
