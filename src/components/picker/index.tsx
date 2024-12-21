import React, { useEffect, useRef } from 'react'

import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

export function EmojiPicker(props: any) {
  const ref = useRef()

  useEffect(() => {
    new Picker({ ...props, data, ref })
  }, [props])

  return <div ref={ref as any} />
}

export default EmojiPicker
