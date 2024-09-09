import * as React from 'react'

import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Add from './add'
import Table from './table'

export default function Authors() {
    const [open,setOpen] = React.useState(false);
    const [trigger, setTrigger] = React.useState(0);

    const updateTrigger = () => {
    setTrigger((trigger)=> trigger + 1)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const useStyles = makeStyles({
        authorsContainer: {
            backgroundImage: 'url("/img/library.jpg")',
            backgroundRepeat: 'round',
            backgroundBlendMode: 'multiply, normal',
            minHeight: '100vh', 
            padding: '20px',
            color: '#ffffff',
            textAlign: 'left',
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
        },
        sectionTitle: {
            fontSize: "40px",
            marginBottom: "20px",
            marginTop: "20px",
            backgroundColor:"#2196F3"
        },
        addButton: {
            color: '#ffffff',
            backgroundColor: "#007acc", 
            '&:hover': {
                backgroundColor: "#005d9d", 
            },
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.authorsContainer}>
        <Box sx={{ml:28,my:5}} >

            <Box className={classes.header}  >
            <Typography variant='h3' className={classes.sectionTitle}>
                Authors
            </Typography> 
            <Box sx={{mx:2,my:3}}>
            <Button variant='outlined' onClick={handleClickOpen} className={classes.addButton}>
                Add Author
            </Button>
            </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                        <Add handleClose={handleClose} updateTrigger={updateTrigger} />
                </DialogContent>
            </Dialog>
            <Box sx={{mt:2,mx:2}}>
                <Table trigger={trigger} />
            </Box>

        </Box>
     
    </div>
  )
}
