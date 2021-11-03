const Callout = ({ icon, children }) => {
  if (!children) {
    return
  }

  return (
    <>
      <div className={`callout`}>
        <div className={`caption`}>{icon.Emoji}</div>
        <div className={`text`}>{children}</div>
      </div>
    </>
  )
}

export default Callout
