import { useRef, useState } from "react";

export default function Player() {
  const input = useRef()
  const [name, setname] = useState("")
  function clickedd(e) {
    setname(input.current.value)
    input.current.value = ""
  }
  return (
    <section id="player">
      <h2>Welcome {name ? name : "Unknown"}</h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={clickedd}>Set Name</button>
      </p>
    </section>
  );
}
