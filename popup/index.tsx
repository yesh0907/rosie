import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import AudioPlayer from "~components/AudioPlayer"

import "~/styles/root-style.css"

function IndexPopup() {
  const [audioSource, setAudioSource] = useState<string | null>(null)

  useEffect(() => {
    const getAudioContent = async () => {
      const audioContent = await sendToBackground({
        name: "getAudioContent"
      })
      if (audioContent) {
        console.log("recved audio content", audioContent)
        setAudioSource(`data:audio/wav;base64,${audioContent}`)
      } else {
        console.log("did not recv audio content", audioContent)
      }
    }

    getAudioContent()
  }, [])

  return (
    <>
      <AudioPlayer src={audioSource} />
    </>
  )
}

export default IndexPopup
