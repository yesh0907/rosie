import type { PlasmoMessaging } from "@plasmohq/messaging"

import { encodedAudioContent } from "~background"

const handler: PlasmoMessaging.MessageHandler = (_req, res) => {
  console.log("sending audio content", encodedAudioContent)
  res.send(encodedAudioContent)
}

export default handler
