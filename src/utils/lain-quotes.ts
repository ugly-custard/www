export interface LainQuote {
  eng: string
  jap: string
}

export const lainQuotes: LainQuote[] = [
  {
    eng: "Present day, present time.",
    jap: "現在、現在、現在……"
  },
  {
    eng: "No matter where you go, everyone is connected.",
    jap: "どこにいても、みんなつながっている。"
  },
  {
    eng: "If you are not remembered, then you never existed.",
    jap: "覚えられていなければ、存在しなかったのと同じ。"
  },
  {
    eng: "Reality is nothing but information.",
    jap: "現実は情報にすぎない。"
  },
  {
    eng: "People only have substance within the memories of other people.",
    jap: "人は他人の記憶の中にしか存在しない。"
  },
  {
    eng: "Who are you?",
    jap: "あんた、誰？"
  },
  {
    eng: "There is no God. The Wired is God.",
    jap: "神はいない。ワイヤードこそが神だ。"
  },
  {
    eng: "I am Lain of the Wired.",
    jap: "私はワイヤードのレイン。"
  },
  {
    eng: "Everything is connected.",
    jap: "すべてはつながっている。"
  },
  {
    eng: "There's no difference between the real world and the Wired.",
    jap: "現実の世界とワイヤードの世界に違いはない。"
  },
  {
    eng: "I am me.",
    jap: "私は私。"
  },
  {
    eng: "We are all connected. Always.",
    jap: "私たちは、いつもつながっている。"
  }
]

export function getRandomLainQuote(): LainQuote {
  return lainQuotes[Math.floor(Math.random() * lainQuotes.length)]
}
