import React from 'react'
import { HeroVariant } from '../components/HeroVariant/Hero';
import './FAQs.css';
import { Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
function Terms() {
  useEffect(() => {
    console.log('useEffect triggered'); // Add this line for testing
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div>
      <HeroVariant
        h1Text="Terms And Conditions"
      />
      <Container className='my-5'>
        <h2 >IskolarLink Data Privacy Policy</h2>
        <section >
          <h4>1. Introduction</h4>
          <p>Welcome to IskolarLink, a web-based application created to streamline the COSOA’s accreditation process and management of student organizations at the Polytechnic University of the Philippines. Our primary aim is to facilitate organization accreditation, membership management, and communication. Your privacy is our top priority, and we are committed to protecting your personal information in compliance with the Data Privacy Act of 2012.</p>
        </section>
        <section>
          <h4>2. Data Collection</h4>
          <p>In order to provide our services, we collect the following types of data:</p>
          <ul>
            <li><strong>Personal Information:</strong> Including but not limited to names, email addresses, academic details, and contact information.</li>
            <li><strong>Usage Data:</strong> Information on how the services are accessed and used, such as login information and user preferences.</li>
          </ul>
          <p>Data is collected through direct user inputs on the platform and through automated technologies for usage data.</p>
        </section>
        <section>
          <h4>3. Use of Data</h4>
          <p>The collected data is used for the following purposes:</p>
          <ul>
            <li><strong>To Process Applications:</strong> Facilitating the application and revalidation processes for student organizations.</li>
            <li><strong>To Enhance User Experience:</strong> Personalizing the service and allowing users to effectively manage their membership and activities.</li>
            <li><strong>Communication:</strong> Sending updates, alerts, and other relevant information to users.</li>
            <li><strong>Improvement of Services:</strong> Data may be used to understand user behavior and improve our platform.</li>
          </ul>
          <p>Data may be shared with relevant stakeholders, such as COSOA and student organizations, strictly for purposes related to the services of IskolarLink.</p>
        </section>
        <section>
          <h4>4. Data Protection</h4>
          <p>We implement a range of security measures to protect your personal information, including encryption, access control, and regular security audits. However, no internet-based platform can guarantee absolute security.</p>
        </section>
        <section>
          <h4>5. User Rights</h4>
          <p>Users have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request copies of personal data held by IskolarLink.</li>
            <li><strong>Rectification:</strong> Correct any inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request the deletion of personal data under certain circumstances.</li>
            <li><strong>Restriction:</strong> Limit how we use your data.</li>
          </ul>
          <p>Users can exercise these rights by contacting us through the provided contact details.</p>
        </section>
        <section>
          <h4>6. Policy Updates</h4>
          <p>This policy may be updated to reflect changes in our practices or legal requirements. Users will be notified of significant changes through our platform or via email.</p>
        </section>
        <section>
          <h4>7. Contact Information</h4>
          <p>For any questions or concerns regarding this policy or your personal data, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> iskolarlink@gmail.com</li>
          </ul>
        </section>
        <div className='mb-5'></div>
        <hr className='my-5 py-3'id="terms-and-conditions"/>
        <div></div>
        <h2>IskolarLink Terms and Conditions</h2>
        <section  >
          <h4>1. Introduction</h4>
          <p>Welcome to IskolarLink, a web-based application created to streamline the COSOA’s accreditation process and  management of student organizations at the Polytechnic University of the Philippines. Our primary aim is to facilitate organization accreditation, membership management, and communication. Your privacy is our top priority, and we are committed to protecting your personal information in compliance with the Data Privacy Act of 2012. By accessing or using the platform, you agree to be bound by these terms.</p>
        </section>
        <section>
          <h4>2. User Accounts</h4>
          <ul>
            <li><strong>Eligibility:</strong> To create an account, you must be a currently enrolled student or a recognized member of the university staff of the Office of the Student Services.</li>
            <li><strong>Account Responsibilities:</strong> Users are responsible for maintaining the confidentiality of their account information and are liable for all activities under their account.</li>
            <li><strong>Security:</strong> Users must notify IskolarLink immediately of any unauthorized use of their account.</li>          
          </ul>
          <p>Data is collected through direct user inputs on the platform and through automated technologies for usage data.</p>
        </section>
        <section>
          <h4>3. Use of IskolarLink</h4>
          <ul>
            <li><strong>Permitted Use:</strong> The platform is intended for managing student organization applications, memberships, and related activities.</li>
            <li><strong>Prohibited Use:</strong> Users must not use IskolarLink for any unlawful purpose, to infringe upon the rights of others, or to disrupt the platform's functionality.</li>
          </ul>
        </section>
        <section>
          <h4>4. Intellectual Property</h4>
          <ul>
            <li><strong>Ownership:</strong> All content on IskolarLink, except user-generated content, is the property of the developer and the Polytechnic University of the Philippines.</li>
            <li><strong>User Content</strong> Users retain ownership of the content they submit but grant IskolarLink a license to use, modify, and display them content as necessary for the platform's operation.</li>
          </ul>  
        </section>
        <section>
          <h4>5. Limitations of Liability</h4>
          <ul>
            <li><strong>Service Availability:</strong> IskolarLink does not guarantee uninterrupted or error-free service and is not responsible for any downtime.</li>
            <li><strong>Liability:</strong> IskolarLink will not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the use of the platform.</li>
          </ul>
        </section>
        <section>
          <h4>6. Modifications to the Service</h4>
          <ul>
            <li><strong>Changes to Platform:</strong> IskolarLink reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice.</li>
            <li><strong>Amendments to Terms:</strong> These terms may be updated from time to time. Continued use of the platform after such changes will constitute acceptance of the new terms.</li>
          </ul>
        </section>
        <section>
          <h4>7. Dispute Resolution</h4>
          <ul>
            <li><strong>Governing Law:</strong> These Terms and Conditions are governed by the laws of the Philippines.</li>
            <li><strong>Resolution:</strong> Any disputes arising from the use of IskolarLink will be resolved through the appropriate legal channels in the Philippines.</li>
          </ul>
        </section>
        <section>
          <h4>8. General Provisions</h4>
          <ul>
            <li><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue to be in full force and effect.</li>
            <li><strong>Waiver:</strong> Failure by IskolarLink to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
            <li><strong>Entire Agreement:</strong>These Terms constitute the entire agreement between you and IskolarLink regarding the use of the platform.</li>
          </ul>
        </section>
        <section>
          <h4>9. Contact Information</h4>
          <p>For any questions or concerns regarding this policy or your personal data, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> iskolarlink@gmail.com</li>
          </ul>
        </section>
      </Container>
    </div>
  )
}

export default Terms;
