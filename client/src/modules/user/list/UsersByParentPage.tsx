import React, {
  FunctionComponent,
  ReactElement,
} from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { getUsersByParentPaginated } from '../apollo/queries'
import { deleteUser as userDeleteMutation } from '../apollo/mutations'
import { IQuery, IUser, IUserPaginated } from '../../../interfaces'
import { Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {routes} from '../../../common/constants'
import DialogBox from '../../../common/components/Dialog'

const useStyles = makeStyles({
  container: {
    display: 'inline-flex'
  },
  root: {
    maxWidth: 500,
    margin: 15
  },
  media: {
    height: 140,
  },
})

const UsersByParentPage: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const userQueryResult: IQuery<IUserPaginated> = getUsersByParentPaginated()
  const { data: users, loading } = userQueryResult
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(false)
  const [currentUserId, setCurrentUserId] = React.useState(null)

  const redirectEditUser = function (userId: string): void {
    navigate(`${routes.userEditPage}/${userId}`)
  }

  const [userDelete] = userDeleteMutation({
    onCompleted() {
      navigate(routes.usersPage)
    },
  })

  const handleDeleteUser = (userId: string): void => {
    event.preventDefault()
    setOpenDialog(true)
    setCurrentUserId(userId)
  }

  const handleAccept = (): void => {
    userDelete({
      variables: {_id: currentUserId },
    })
    setOpenDialog(false)
  }

  const handleReject = (): void => {
    setOpenDialog(false)
  }

  const handleClose = (): void => {
    setOpenDialog(false)
  }

  return (
    <Container maxWidth='xl' className={classes.container}>
      { !loading && users.data.map((user: IUser) => {
        return (
          <Card key={`${user._id}-index`} className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {user.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {user.email}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {user.address}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {user.type}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={() => redirectEditUser(user._id)}>
                Edit
              </Button>
              <Button size='small' color='secondary' onClick={() => handleDeleteUser(user._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        )
      })
      }
      <DialogBox
        onClose={handleClose}
        open={openDialog}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </Container>
  )
}

export default UsersByParentPage
