import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import React, { useContext } from 'react';
import { AiOutlineCheckCircle, AiOutlineSend } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedinIn, FaMediumM, FaStackOverflow, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiAtSign, FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { ThemeContext } from '../../../contexts/theme-context';
import { contactsData } from '../../../data/contactsData';
import { socialsData } from '../../../data/socialsData';
import './contacts.css';

const ContactUI = ({ open, success, errMsg, handleClose, classes, handleContactForm, name, setName, form, email, setEmail, message, setMessage }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className='contacts'
      id='contacts'
      style={{ backgroundColor: theme.secondary }}
    >
      <div className='contacts--container'>
        <h1 align="center" style={{ color: theme.primary }}>Contacts</h1>
        <div className='contacts-body'>
          <div className='contacts-form'>
            <form ref={form} onSubmit={handleContactForm}>
              
            </form>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <SnackbarContent
                action={
                  <React.Fragment>
                    <IconButton
                      size='small'
                      aria-label='close'
                      color='inherit'
                      onClick={handleClose}
                    >
                      <IoClose fontSize='small' />
                    </IconButton>
                  </React.Fragment>
                }
                style={{
                  backgroundColor: theme.primary,
                  color: theme.secondary,
                  fontFamily: 'var(--primaryFont)',
                }}
                message={errMsg}
              />
            </Snackbar>
          </div>

          <div className='contacts-details'>
            <a
              href={`mailto:${contactsData.email}`}
              className='personal-details'
            >
              <div className={classes.detailsIcon}>
                <FiAtSign />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.email}
              </p>
            </a>
            <a
              href={`tel:${contactsData.phone}`}
              className='personal-details'
            >
              <div className={classes.detailsIcon}>
                <FiPhone />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.phone}
              </p>
            </a>
            <div className='personal-details'>
              <div className={classes.detailsIcon}>
                <HiOutlineLocationMarker />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.address}
              </p>
            </div>

            
            
          </div>
        </div>
      </div>
      <img
        src={theme.contactsimg}
        alt='contacts'
        className='contacts--img'
      />
    </div>
  );
};

export default ContactUI;