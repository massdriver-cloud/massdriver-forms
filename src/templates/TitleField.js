import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
const TitleField = ({ id, title }) => (
  <Box id={id} mb={1} mt={1}>
    <Typography
      variant='h5'
      sx={{
        fontSize: `${
          26 - (id?.split('::').length - 1) * 2 > 16
            ? 26 - (id?.split('::').length - 1) * 2
            : 16
        }px`
      }}
    >
      {title}
    </Typography>
    <Divider />
  </Box>
)

export default TitleField
