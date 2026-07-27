import { useState } from 'react';
import { Button, Modal, Form, Row, Col, CloseButton, Container} from 'react-bootstrap';
import './general.css';
import axios from 'axios';


function AddAnnouncement({setRefreshAnnouncement}) {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const handleCloseAnnouncement = () => setShowAnnouncement(false);
  const handleShowAnnouncement = () => setShowAnnouncement(true);

  const [postAnnouncement, setPostAnnouncement] = useState({
    org_ann_title: "",
    org_ann_link: "",
    org_ann_body: "",
    org_ann_photo: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${process.env.REACT_APP_BASE_URL}/org_portal/add_announcement`, postAnnouncement, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }else{
          alert(response.data.success);
          setRefreshAnnouncement(true);
          handleCloseAnnouncement();

        }
      });
      
    } catch (error) {
      
    }
  }

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
            <Modal.Title id="announcement-popup" className="ms-auto Inter-b modal-title mt-4">
              Publish an Announcement
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="Inter-normal">
            <div className='p-5'>
              <Form>
                <Form.Group className="mb-3" controlId="formAnnouncementTitle">
                  <Form.Label className='Inter-med'>Title/Headline</Form.Label>
                  <Form.Control type="text" placeholder="Insert Title/Headline" className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, org_ann_title: e.target.value})}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAnnouncementSubTitle">
                  <Form.Label className='Inter-med'>Facebook Link</Form.Label>
                  <Form.Control type="text" placeholder="Insert Subtitle" className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, org_ann_link: e.target.value})}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAnnouncementImg">
                  <Form.Label className='Inter-med'>Upload Photo</Form.Label>
                  <Form.Control type="file" className='Inter-normal' onChange={(e) => {setPostAnnouncement({...postAnnouncement, org_ann_photo: e.target.files[0]})}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAnnouncementDesc">
                  <Form.Label className='Inter-med'>Description</Form.Label>
                  <Form.Control type="text" className='Inter-normal' placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." onChange={(e) => {setPostAnnouncement({...postAnnouncement, org_ann_body: e.target.value})}}/>
                </Form.Group>

                
                <Row className="p-2 my-1">
                  <Button variant="primary" type="submit" className="Inter" onClick={handleSubmit}>
                  Publish
                  </Button>
                </Row>
                <Row className="p-2 my-1">
                  <Button variant="light" type="submit" className="Inter" onClick={handleCloseAnnouncement}>
                  Cancel
                  </Button>
                </Row>
                </Form>
            </div>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
}

export default AddAnnouncement;
