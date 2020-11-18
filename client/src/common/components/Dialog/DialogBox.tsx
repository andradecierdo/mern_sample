import React, { FunctionComponent, PropsWithChildren, ReactElement } from 'react'
// eslint-disable-next-line sort-imports
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

interface IDialogBox {
  headerMessage: string
  onAccept: () => void
  onReject: () => void
  onClose: () => void
  open: boolean
}

export const DialogBox: FunctionComponent<IDialogBox> = (
  props: PropsWithChildren<IDialogBox>
): ReactElement => {
  const { headerMessage, onAccept, onReject, onClose, open } = props

  const handleClose = (): void => {
    onClose()
  }

  const handleCancel = (): void => {
    onReject()
  }

  const handleAgree = (): void => {
    onAccept()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{headerMessage}</DialogTitle>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleAgree} color='secondary' autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox
