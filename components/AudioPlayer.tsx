import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon
} from "lucide-react"
import React, { useEffect, useState } from "react"

import { Button } from "~/components/button"
import { Slider } from "~/components/slider"

export interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
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

    return () => {
      audioElement.removeEventListener("loadedmetadata", setAudioDuration)
      audioElement.removeEventListener("timeupdate", setAudioCurrentTime)
      audioElement.removeEventListener("play", setAudioPlaybackSpeed)
    }
  }, [])

  useEffect(() => {
    if (src) {
      audio.setAttribute("src", src)
      console.log("set audio src")
    }
  }, [src])

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
    <div className="rosie-p-4 rosie-w-96 rosie-bg-background rosie-text-foreground">
      <h1 className="rosie-text-2xl rosie-font-bold rosie-mb-4">Rosie</h1>
      <div className="rosie-space-y-4">
        <div className="rosie-flex rosie-justify-between rosie-items-center rosie-gap-1">
          <span className="rosie-mr-4">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={([value]) => {
              if (audio) {
                audio.currentTime = value
              }
            }}
            className="rosie-w-48"
          />
          <span className="rosie-ml-2">{formatTime(duration)}</span>
        </div>
        <div className="rosie-flex rosie-justify-between rosie-items-center">
          <Button onClick={skipBackward} size="icon" variant="outline">
            <SkipBackIcon className="rosie-h-4 rosie-w-4" />
          </Button>
          <Button onClick={togglePlayPause} size="icon">
            {isPlaying ? (
              <PauseIcon className="rosie-h-4 rosie-w-4" />
            ) : (
              <PlayIcon className="rosie-h-4 rosie-w-4" />
            )}
          </Button>
          <Button onClick={skipForward} size="icon" variant="outline">
            <SkipForwardIcon className="rosie-h-4 rosie-w-4" />
          </Button>
        </div>
        <div className="rosie-flex rosie-justify-between rosie-items-center">
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
