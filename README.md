# massdriver-forms

Massdriver's wrapper for RJSF.

## Getting Started

1. Run `npm install @massdriver/forms`

2. Create a new `Form.js` file.

3. Create a wrapper with your custom Form services configuration:

```
import createForm from '@massdriver/forms'

const Form = props => {

  const MassdriverForm = createForm({
    services: {
      // services go here
    }
  })

  return (
    <MassdriverForm {...props} />
  )
}
```
