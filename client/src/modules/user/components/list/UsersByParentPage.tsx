import React, { FunctionComponent, ReactElement } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
// eslint-disable-next-line sort-imports
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core'

import { IQuery, IUser, IUserPaginated } from '../../../../interfaces'
import Dialog from '../../../../common/components/Dialog'
import { getUsersByParentPaginated } from '../../apollo/queries'
import { makeStyles } from '@material-ui/core/styles'
import { routes } from '../../../../common/constants'
import { deleteUser as userDeleteMutation } from '../../apollo/mutations'

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
  },
  media: {
    height: 140,
  },
  root: {
    margin: 15,
    maxWidth: 500,
  },
})

const UsersByParentPage: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const userQueryResult: IQuery<IUserPaginated> = getUsersByParentPaginated()
  const { data: users, loading, refetch } = userQueryResult
  const classes = useStyles()

  const [openDialog, setOpenDialog] = React.useState(false)
  const [currentUserId, setCurrentUserId] = React.useState(null)

  const redirectEditUser = function (userId: string): void {
    navigate(`${routes.userEditPage}/${userId}`)
  }

  const [userDelete] = userDeleteMutation({
    onCompleted() {
      refetch()
    },
  })

  const handleDeleteUser = (userId: string): void => {
    event.preventDefault()
    setOpenDialog(true)
    setCurrentUserId(userId)
  }

  const handleAccept = (): void => {
    userDelete({
      variables: { _id: currentUserId },
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
      {!loading &&
        users.data.map((user: IUser) => {
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
                <Button
                  size='small'
                  color='primary'
                  onClick={(): void => redirectEditUser(user._id)}>
                  Edit
                </Button>
                <Button
                  size='small'
                  color='secondary'
                  onClick={(): void => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          )
        })}
      <Dialog
        headerMessage='Are you sure you want to delete?'
        onClose={handleClose}
        open={openDialog}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </Container>
  )
}

export default UsersByParentPage
