type Props = {
  year: number
  month: number
  date: number
}

const Birthdate = (birthday: Props): string => {
  const today = new Date()
  const thisYearsBirthday = new Date(today.getFullYear(), birthday.month - 1, birthday.date)
  let age = today.getFullYear() - birthday.year

  if (today < thisYearsBirthday) {
    age--
  }

  return age + '歳'
}

export default Birthdate
