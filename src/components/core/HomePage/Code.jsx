import React from 'react'
import HighlightText from './HighlightText'
const Code = () => {
  return (
    <div>
      <pre>
  {`<`}
  <HighlightText text="!DOCTYPE HTML" color="blue" />
  {`>\n<`}
  <HighlightText text="html" color="green" />
  {`>\n  <head>\n    <title>Example</title>\n    <link rel="stylesheet" href="styles.css" />\n  </head>\n  <body>\n    <h1>\n      <a href="/">Header</a>\n    </h1>\n    <nav>\n      <a href="one/">One</a>\n      <a href="two/">Two</a>\n      <a href="three/">Three</a>\n    </nav>\n  </body>\n</html>`}
</pre>

    </div>
  )
}

export default Code
