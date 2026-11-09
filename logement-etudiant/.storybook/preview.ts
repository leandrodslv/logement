import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: {} },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fc' },
        { name: 'dark', value: '#0d1117' },
      ],
    },
  },
}

export default preview
