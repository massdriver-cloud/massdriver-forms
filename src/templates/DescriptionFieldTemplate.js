import Typography from '@mui/material/Typography'
import FormsMarkdown from '../components/markdown/FormsMarkdown'

/** NOTE
 *  This is an internal RJSF component that we have overriden to provide custom support.
 *  Be careful when touching anything in this file, as much of the code is used by RJSF internally.
 *
 *
 *  Treat this file as part of RJSF's internal Form implementation.
 */

/**
 * Overrides @rjsf/mui's DescriptionFieldTemplate.
 *
 * Provides support for markdown in field descriptions.
 */

const DescriptionFieldTemplate = ({ description, id }) =>
  description ? (
    <Typography id={id} variant='caption' color='textSecondary'>
      <FormsMarkdown>{description}</FormsMarkdown>
    </Typography>
  ) : null

export default DescriptionFieldTemplate
