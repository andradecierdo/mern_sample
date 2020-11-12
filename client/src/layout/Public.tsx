import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import {makeStyles} from '@material-ui/core/styles'

interface IProps {
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#133337',
    height: '100vh'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}))

const PublicComponent: FunctionComponent = (props: IProps): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content} id='body'>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

export default PublicComponent
