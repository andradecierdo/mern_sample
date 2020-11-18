import React, { FunctionComponent, ReactElement } from 'react'
// eslint-disable-next-line sort-imports
import {
  AccountBox,
  ChevronLeft,
  ChevronRight,
  House,
  Menu,
  PowerSettingsNew,
  SupervisedUserCircle,
} from '@material-ui/icons'
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import clsx from 'clsx'

import { navigate } from '@reach/router'
import { routes } from '../../constants'
import * as Cookies from 'js-cookie'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1a8296',
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: 36,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))

const SideMenu: FunctionComponent = (): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  const handleLogout = (): void => {
    event.preventDefault()
    Cookies.remove('auth')
    navigate(routes.homepage)
  }

  const handleRedirect = (route: string): void => {
    event.preventDefault()
    navigate(route)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap>
            Sample MERN Web Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button key='home' onClick={(): void => handleRedirect(routes.homepage)}>
          <ListItemIcon>
            <House />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <Divider light />
        <ListItem
          button
          key='users'
          onClick={(): void => handleRedirect(routes.usersPage)}>
          <ListItemIcon>
            <SupervisedUserCircle />
          </ListItemIcon>
          <ListItemText primary='Users List' />
        </ListItem>
        <ListItem
          button
          key='users'
          onClick={(): void => handleRedirect(routes.userCreatePage)}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary='Create User' />
        </ListItem>
        <Divider light />
        <ListItem button key='logout' onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </Drawer>
    </React.Fragment>
  )
}

export default SideMenu
