import { SerializedTextNode } from '@payloadcms/richtext-lexical';
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE
} from '@payloadcms/richtext-lexical/lexical';
import { JSXConverters } from '@payloadcms/richtext-lexical/react';
import React from 'react';

export const textConverter: JSXConverters<SerializedTextNode> = {
  text: ({ node }) => {
    let text: React.ReactNode = node.text;
    const styles: React.CSSProperties = {};

    if (node.style) {
      const styleStrings = node.style.split(';');
      styleStrings.forEach(str => {
        const [key, value = null] = str.split(':');
        if (key) {
          Object.assign(styles, { [key]: value });
        }
      });
    }

    if (node.format & IS_BOLD) {
      text = <b>{text}</b>;
    }
    if (node.format & IS_ITALIC) {
      text = <em>{text}</em>;
    }
    if (node.format & IS_STRIKETHROUGH) {
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>;
    }
    if (node.format & IS_UNDERLINE) {
      text = <span style={{ textDecoration: 'underline' }}>{text}</span>;
    }
    if (node.format & IS_SUBSCRIPT) {
      text = <sub>{text}</sub>;
    }
    if (node.format & IS_SUPERSCRIPT) {
      text = <sup>{text}</sup>;
    }
    if (node.style) {
      text = <span style={styles}>{text}</span>;
    }

    return text;
  }
};
