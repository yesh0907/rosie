import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon
} from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "~/components/button"
import { Slider } from "~/components/slider"

import "../style.css"

function IndexPopup() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    // Initialize audio
    const audioElement = new Audio()
    setAudio(audioElement)

    // Add event handlers
    const setAudioDuration = () => setDuration(audioElement.duration)
    const setAudioCurrentTime = () => {
      const { currentTime, duration } = audioElement
      if (currentTime === duration) {
        setIsPlaying(false)
      }
      setCurrentTime(currentTime)
    }
    audioElement.addEventListener("loadedmetadata", setAudioDuration)
    audioElement.addEventListener("timeupdate", setAudioCurrentTime)
    audioElement.addEventListener("play", setAudioPlaybackSpeed)

    // Load Audio from extension
    audioElement.src = chrome.runtime.getURL("assets/generations/audio.mp3")

    return () => {
      audioElement.removeEventListener("loadedmetadata", setAudioDuration)
      audioElement.removeEventListener("timeupdate", setAudioCurrentTime)
      audioElement.removeEventListener("play", setAudioPlaybackSpeed)
    }
  }, [])

  const setAudioPlaybackSpeed = () => {
    handleSpeedChange(playbackRate)
  }

  const togglePlayPause = () => {
    if (audio) {
      if (!isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skipForward = () => {
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 15)
    }
  }

  const skipBackward = () => {
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 15)
    }
  }

  const handleSpeedChange = (speed: number) => {
    if (audio) {
      audio.playbackRate = speed
      setPlaybackRate(speed)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-4 w-80 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Rosie</h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={([value]) => {
              if (audio) {
                audio.currentTime = value
              }
            }}
            className="w-48"
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex justify-between items-center">
          <Button onClick={skipBackward} size="icon" variant="outline">
            <SkipBackIcon className="h-4 w-4" />
          </Button>
          <Button onClick={togglePlayPause} size="icon">
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={skipForward} size="icon" variant="outline">
            <SkipForwardIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => handleSpeedChange(1)}
            variant={playbackRate === 1 ? "default" : "outline"}
            size="sm">
            1x
          </Button>
          <Button
            onClick={() => handleSpeedChange(1.25)}
            variant={playbackRate === 1.25 ? "default" : "outline"}
            size="sm">
            1.25x
          </Button>
          <Button
            onClick={() => handleSpeedChange(1.5)}
            variant={playbackRate === 1.5 ? "default" : "outline"}
            size="sm">
            1.5x
          </Button>
          <Button
            onClick={() => handleSpeedChange(1.75)}
            variant={playbackRate === 1.75 ? "default" : "outline"}
            size="sm">
            1.75x
          </Button>
          <Button
            onClick={() => handleSpeedChange(2)}
            variant={playbackRate === 2 ? "default" : "outline"}
            size="sm">
            2x
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
