import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneAreaBase} from 'material-ui-dropzone'
import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    Box,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormHelperText,
    Link,
    Grid,
    Typography,
    Container,
    CardMedia,
    Card,
    Chip,
    Paper,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import BackupIcon from '@material-ui/icons/Backup';
import {
    Alert,
    Autocomplete
} from '@material-ui/lab'
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'
import ButtonCircularProgress from "../components/ButtonCircularProgress";
import Header from "../components/Header";
import CheckToken from "../help/helper";
import { tr } from "date-fns/locale";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
      Palette Market
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textAlign: "center",
        float: "right"
    },
    back: {
        margin: theme.spacing(3, 0, 2),
        textAlign: "center",
    },
    field: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        textAlign: "center"
    },
    fileError: {
        backgroundColor: "transparent"
    },
    card: {
        height: "100%",
    },
    media: {
        height: "100%",
    },
    date: {
        marginTop: "8px",
        width: "100%"
    },
    tagPaper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5)
    },
    noTag: {
        width: '100%'
    },
    noFile: {
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0
    },
    editor: {
        //   border: "1px solid #c0c0c0",
        margin: '8px'
    },
    varinatPaper: {
        padding: theme.spacing(2)
    },
    variant: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    },
    formLable: {
        marginBottom: theme.spacing(1)
    }
}));

export default function UploadArtwork(props) {
    const { handleClose, pro_id } = props
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUpload] = useState(false);
    const [isUploadFail, setIsUploadFail] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [fileErrorText, setFileErrorText] = useState("");
    const [artFile, setArtFile] = useState(null);
    const [artSrc, setArtSrc] = useState(null);
    const [artworkDate, setArtworkDate] = useState(new Date());
    const [tagOption, setTagOption] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [description, setDescription] = useState("");
    const [titleDefault, setTitleDefault] = useState("");
    const [vendorDefault, setVendorDefault] = useState("");
    const [defaultEdit, setDefaultEdit] = useState("");
    const [artType, setArtType] = useState("");
    const [variants, setVariants] = useState([
        {
            key: 0,
            size: "5x7",
            price: null
        },
        {
            key: 1,
            size: "9x12",
            price: null
        },
    ]);
    
    useEffect(() => {
        if(CheckToken()) {
            axios.get(`${window.$host}/artwork/tags`).then(res => {
                let tags = [];
                res.data.products.map(product => {
                    let items = product.tags.split(", ");
                    items.map(item => {
                        if(item !== "") tags.push(item);
                    })
                })
                tags = tags.filter((elem, index, self) => {
                    return index === self.indexOf(elem)
                })
                console.log("tags", tags)
                if(tags[0] === "") tags.shift();
                setTagOption(tags)
            })
            axios.get(`${window.$host}/artwork?id=${pro_id}`).then(res => {
                console.log(res)
                if(res.status === 200) {
                    let artwork = res.data[0];
                    console.log(artwork.artType)
                    setArtSrc(artwork.file)
                    setArtworkDate(artwork.date);
                    setArtType(artwork.artType)
                    setSelectedTags( () => {
                        let tags = [];
                        let items = artwork.tags.split(",");
                        items.map(item => {
                            if(item !== "") tags.push(item);
                        })
                        return tags;
                    })
                    setDescription(artwork.description)
                    setTitleDefault(artwork.title)
                    setVendorDefault(artwork.vendor)
                    setVariants(artwork.variants)
                    setDefaultEdit(artwork.description)
                } else {
                    alert("fail! try again")
                }
            })
        }
    }, [])

    const uploadSubmit = (e) => {
        e.preventDefault();
        console.log(variants)
        if(CheckToken()) { 
            setIsLoading(true);       
            const event = new Date(artworkDate);
            let newDate = `${event.getMonth()}/${event.getDay()}/${event.getFullYear()}`;
            const formData = new FormData();
            formData.append("file", artFile);
            formData.append("title", titleDefault);
            formData.append("vendor", vendorDefault);
            formData.append("artType", artType);
            formData.append("variants", JSON.stringify(variants));
            formData.append("date", newDate);
            formData.append("tags", selectedTags);
            formData.append("description", description);
            axios.post(`${window.$host}/artwork/upload?id=${pro_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                if(res.status === 200) {
                    setIsUploadFail(false)
                } else {
                    setIsUploadFail(true)
                }
                handleClose()
                setIsLoading(false)
            }).catch(err => {
                setIsUploadFail(true)
                setIsUpload(false);
            })
        }
    }

    const artVendor = (event) => {
        setVendorDefault(event.target.value)
    }
    
    const artDefaultPrice = (key) => (event) => {
        setVariants(variants.map(data => {
            if(data.key === key) {
                data.price = event.target.value
            }
            return data;
        }))
    }

    const artTitle = (event) => {
        setTitleDefault(event.target.value)
    }

    const handleFiles = files => {
        console.log(files)
        setArtSrc(files[0].data)
        setArtFile(files[0].file)
    }

    const handleArtworkDate = (date) => {       
        setArtworkDate(date)
    }

    const handleTagDelete = tagToDelete => () => {
        setSelectedTags(tags => tags.filter(tag => tag !== tagToDelete));
    }  
    
    const handleEditor = content => {
        setDescription(content)
    }

    const selectArtType = (e) => {
        setArtType(e.target.value)
    }

  return (
    <div>
        <Header openDialog={true} title="Edit your artwork"/>
        <Container component="main">
        <CssBaseline />
        <div id="upload-result" className={classes.paper}>
            <Avatar className={classes.avatar}>
            <BackupIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Upload Artwork
            </Typography>
            <form className={classes.form} onSubmit={uploadSubmit}>
                {isUploaded && <Alert severity="success">Successfully Update! your artwork added on Palette Market</Alert>}
                {isUploadFail && <Alert severity="error">Update Failed!. Please try again.</Alert>}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <DropzoneAreaBase
                            acceptedFiles={['image/png, .jpg, .jpeg']}
                            dropzoneText={"Drag and drop your Artwork here or click"}
                            onAdd = {(handleFiles)}
                        />
                        {fileError && (
                            <FormHelperText
                            error
                            className={classes.fileError}
                            >
                            {fileErrorText}
                            </FormHelperText>
                        )}
                    </Grid>
                    { artSrc === null ? 
                            <Grid item xs={12} sm={6}>
                                <Paper component='ul' className={classes.noFile}>
                                    <Alert severity="info" className={classes.noTag}>No Selected Artworks</Alert>
                                </Paper>
                            </Grid> : 
                            <Grid item xs={12} sm={6}>
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.media}
                                        image={artSrc}
                                        title="Artwork"
                                    />
                                </Card>
                            </Grid>}
                </Grid>
               
                <Typography component="h1" variant="h5" className={classes.field}>
                    Fields
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="art_title"
                            label="Title of your artwork"
                            onChange={artTitle}
                            value={titleDefault}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="vendor"
                            variant="outlined"
                            required
                            fullWidth
                            id="vendor"
                            label="Vendor"
                            onChange={artVendor}
                            value={vendorDefault}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel id="demo-simple-select-label">Artwork Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={artType}
                                onChange={selectArtType}
                                label="Artwork Type"
                            >
                                <MenuItem value="Art Print">Art Print</MenuItem>
                                <MenuItem value="Photograph">Photograph</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>    
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker 
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Artwork Date"
                                value={artworkDate}
                                onChange={handleArtworkDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                                className={classes.date}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper variant="outlined" className={classes.varinatPaper}>
                                {
                                    variants.map((data, key) => (
                                    <Grid container spacing={2}>
                                        <Grid className={classes.variant} item xs={12} sm={1}>Variant {key + 1}</Grid>
                                        <Grid item xs={12} sm={5}>
                                            <TextField
                                                name="Size"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Size"
                                                disabled
                                                value={data.size}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="price"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                key={1}
                                                label="Price"
                                                type="number"
                                                onChange={artDefaultPrice(data.key)}
                                                value={parseInt(data.price)}
                                            />
                                        </Grid>
                                    </Grid>)
                                    )
                                }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <SunEditor
                            setOptions={{
                                plugins: plugins,
                                buttonList: [
                                    ['undo', 'redo'],
                                    ['fontSize', 'formatBlock'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                    ['removeFormat'],
                                    ['fontColor', 'hiliteColor'],
                                    ['indent', 'outdent'],
                                    ['align', 'horizontalRule', 'list', 'table'],
                                    ['link'],
                                    ['fullScreen', 'showBlocks', 'codeView'],
                                    ['preview', 'print']
                                ],
                            }}
                            setContents={defaultEdit}
                            onChange={handleEditor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <Autocomplete
                            id="predefinded-tags"
                            onChange={
                                (event, newValue) => {
                                   if(selectedTags.indexOf(newValue) < 0) setSelectedTags([...selectedTags, newValue])
                                }
                            }
                            style={{ width: '100%' }}
                            options={tagOption}
                            renderInput={(params) => <TextField {...params} label="Predefined Tags" variant="outlined" />}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       { <Paper component='ul' className={classes.tagPaper}>
                          { selectedTags.length === 0 ? <Alert severity="info" className={classes.noTag}>No Selected Tags</Alert> : 
                               selectedTags.map((data, key) => {
                                   return (
                                       <li key={key}>
                                           <Chip
                                            label={data}
                                            onDelete={handleTagDelete(data)}
                                            className={classes.chip}
                                            />
                                       </li>
                                   );
                               })
                            
                           }                 
                       </Paper>}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                         <Button
                            variant="contained"
                            color="primary"
                            className={classes.back}
                            onClick={handleClose}
                        >
                            Back                           
                        </Button> 
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save Artwork
                            {isLoading && <ButtonCircularProgress />}
                        </Button> 
                    </Grid>
                                  
                </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    </div>
  );
}
