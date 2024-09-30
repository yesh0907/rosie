import rosieIcon from "data-base64:~/assets/rosie.png"
import tailwindCssText from "data-text:~/styles/host-style.css"
import playerCssText from "data-text:~/styles/player.css"
import { PauseIcon, PlayIcon } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = `
  ${tailwindCssText}
  ${playerCssText}
  `
  return style
}

const UI = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [hasAudio, setHasAudio] = useState(false)

  useMessage((req) => {
    if (req.name === "audioContent") {
      const audioSrc = `data:audio/wav;base64,${req.body}`
      audio.setAttribute("src", audioSrc)
      setTimeout(() => audio.play(), 500)
      setHasAudio(true)
    }
  })

  useEffect(() => {
    if (hasAudio) {
    }
  }, [hasAudio])

  useEffect(() => {
    // Initialize audio
    const audioElement = new Audio()
    setAudio(audioElement)

    // Add event handlers
    const handlePlayPause = () => setIsPlaying(!audioElement.paused)
    const handleLoadedMetadata = () => setHasAudio(true)
    audioElement.addEventListener("play", handlePlayPause)
    audioElement.addEventListener("pause", handlePlayPause)
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audioElement.removeEventListener("play", handlePlayPause)
      audioElement.removeEventListener("pause", handlePlayPause)
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  function togglePlayPause() {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }

  if (!hasAudio) {
    return null
  }

  return (
    <div
      id="rosie-fab-container"
      className="rosie-flex rosie-shadow-all rosie-justify-center rosie-items-center rosie-rounded-full rosie-p-2 rosie-mr-2 rosie-bg-background rosie-gap-2 rosie-group">
      <button
        className="rosie-ml-1 rosie-hidden group-hover:rosie-block hover:rosie-bg-red-300 rosie-rounded-full rosie-w-8 rosie-h-8"
        onClick={togglePlayPause}>
        {!isPlaying ? (
          <PlayIcon className="rosie-w-5 rosie-h-5 rosie-text-slate-900 rosie-mx-auto" />
        ) : (
          <PauseIcon className="rosie-w-5 rosie-h-5 rosie-text-slate-900 rosie-mx-auto" />
        )}
      </button>
      <button>
        <img className="rosie-w-8 rosie-h-8" src={rosieIcon} alt="rosie icon" />
      </button>
    </div>
  )
}

export default UI
