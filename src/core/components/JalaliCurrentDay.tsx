




export const JalaliCurrentDay = new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(
  new Date(Date.now())
)
