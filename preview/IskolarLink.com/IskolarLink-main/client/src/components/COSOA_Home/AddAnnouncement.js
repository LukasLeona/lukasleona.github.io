import { useState } from 'react';
import { useRef } from 'react';
import { Button, Modal, Form, Row, Col, CloseButton, Container, Image} from 'react-bootstrap';
import './general.css';
import axios from 'axios';
import LoadingOverlay from '../LoadingOverlay'


function AddAnnouncement({setRefreshAnnouncement}) {

  axios.defaults.withCredentials = true;
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const handleCloseAnnouncement = () => setShowAnnouncement(false);
  const [showTempImage, setShowTempImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleShowAnnouncement = () => setShowAnnouncement(true);

  const [postAnnouncement, setPostAnnouncement] = useState({
    cosoa_ann_title: "",
    cosoa_ann_link: "",
    cosoa_ann_body: "",
    cosoa_ann_photo: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(postAnnouncement)
      axios.post(`${process.env.REACT_APP_BASE_URL}/cosoa_ann`, postAnnouncement, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }else{
          alert('Announcement posted!');
          setRefreshAnnouncement(true);
          handleCloseAnnouncement();

        }
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

    const handleContainerClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      if(selectedFile){
        setShowTempImage(true)
        setPreviewImageUrl(URL.createObjectURL(selectedFile))
        setPostAnnouncement({...postAnnouncement, cosoa_ann_photo: selectedFile})
      }else{
        setShowTempImage(false)
        setPreviewImageUrl('')
      }
      
    };
  

  return (
    <>
        <Button variant="primary" onClick={handleShowAnnouncement}>+ Add Announcement</Button>
        <Modal
            show={showAnnouncement}
            onHide={handleCloseAnnouncement}
            backdrop="static"
            keyboard={true}
            size="lg"
            className="rounded-modal"
            centered
            animation
        >
        <Container fluid className="pt-1" >
          <Modal.Header className="px-4 modal-header text-black mx-5" closeButton>
            <Modal.Title id="announcement-popup" className="ms-auto Inter-b modal-title" style={{fontSize:'2em'}}>
              Publish an Announcement
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="Inter-normal">
            <div className='px-2 py-0'>
              <Form>
                <Form.Group className="mb-3" controlId="formAnnouncementTitle">
                  <Form.Label className='Inter-med'>Title/Headline</Form.Label>
                  <Form.Control type="text" required className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, cosoa_ann_title: e.target.value})}}/>
                </Form.Group>
              <Form.Label>Upload Photo</Form.Label>  
              <Container
              className='border text-center my-2 rounded-4'
              fluid
              onClick={handleContainerClick}
              style={{ cursor: 'pointer' }}
            >
              {showTempImage ? (
                <Image
                src={previewImageUrl}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '10px',
                  marginTop: '10px'
                }}
                alt='Uploaded Image'
                />
              ):null}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Row className='justify-content-center'>
                <Image
                  src="/uploadicon.png"
                  style={{
                    maxWidth: '80px',
                    maxHeight: '80px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '50%',
                    display: 'block'
                  }}
                  alt="Upload Icon"
                />
              </Row>
              <Row className='mb-0 pb-0'>
                <p className='text-gray2'>
                  <strong className='text-red'>Click to upload</strong> or drag and drop
                  <br />SVG, PNG, or JPG (max. 800x400 px)
                </p>
              </Row>
            </Container>
            <Form.Group className="mb-3" controlId="formAnnouncementDesc">
                  <Form.Label className='Inter-med'>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, cosoa_ann_body: e.target.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAnnouncementSubTitle">
                  <Form.Label className='Inter-med'>Facebook Link</Form.Label>
                  <Form.Control type="text" className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, cosoa_ann_link: e.target.value})}}/>
                </Form.Group>
{/*
                <Form.Group className="mb-3" controlId="formAnnouncementImg">
                  <Form.Label className='Inter-med'>Upload Photo</Form.Label>
                  <Form.Control type="file" className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, cosoa_ann_photo: e.target.files[0]})}}/>
                </Form.Group>

                
                */}
                
                <Row className="p-2 my-1">
                  <Button variant="primary" type="submit" className="Inter" onClick={handleSubmit}>
                  Publish
                  </Button>
                </Row>
                <Row className="p-2 my-1">
                  <Button variant="light" type="submit" className="Inter" onClick={handleSubmit}>
                  Cancel
                  </Button>
                </Row>
                </Form>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
      {loading && <LoadingOverlay title={"Uploading Announcement..."}/>}
    </>
  );
}

export default AddAnnouncement;
