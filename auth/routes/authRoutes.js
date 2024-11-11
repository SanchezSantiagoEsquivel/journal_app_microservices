import express from 'express';
import { 
    startGoogleSignIt,
    creatingUserWithEmailPassword,
    authenticateUserWithEmailPassword,
    logout,
    getAuthenticatedUser
} from '../authController.js';

const router = express.Router();

router.post('/google-signin', startGoogleSignIt);
router.post('/register', creatingUserWithEmailPassword);
router.post('/login', authenticateUserWithEmailPassword );
router.post('/logout', logout);
router.post('/check-auth-state', getAuthenticatedUser);

export default router;
