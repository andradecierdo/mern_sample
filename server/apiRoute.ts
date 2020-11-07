// tslint:disable-next-line: no-var-requires
require('dotenv').config()

import express from 'express'
import getUsers from './api/getUsers'

const router = express.Router()

// API: Users
router.get('/users', getUsers)

export default router
