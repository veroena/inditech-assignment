import { AppBar, Toolbar, Typography } from '@mui/material';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
