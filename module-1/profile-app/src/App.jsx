import React from 'react';
import './App.css';

// Component 1: The Header (Uses props for dynamic text)
function ProfileHeader(props) {
  return (
    <header className="profile-header">
      <h1>{props.name}</h1>
      <h2>{props.title}</h2>
    </header>
  );
}

// Component 2: A Reusable Section Wrapper (Uses props.children to wrap content)
function Section(props) {
  return (
    <section className="profile-section">
      <h3>{props.title}</h3>
      {/* props.children renders whatever is nested inside this component */}
      <div className="section-content">
        {props.children}
      </div>
    </section>
  );
}

// Component 3: A simple list item for skills
function Skill(props) {
  return <li className="skill-item">{props.skillName}</li>;
}

// Component 4: The Main App (Brings everything together)
export default function App() {
  return (
    <div className="app-container">
      {/* Passing data via Props */}
      <ProfileHeader 
        name="Sami" 
        title="Student & Front-End Developer" 
      />

      {/* Using the reusable Section component */}
      <Section title="About Me">
        <p>
          Hi, I'm an 11th-grade student with a passion for building things for the web. 
          When I'm not studying or coding in HTML, CSS, and JavaScript, you can usually 
          find me on the football pitch playing as a midfielder!
        </p>
      </Section>

      <Section title="My Web Dev Skills">
        <ul className="skills-list">
          {/* Reusing the Skill component multiple times */}
          <Skill skillName="HTML5" />
          <Skill skillName="CSS3" />
          <Skill skillName="JavaScript (ES6)" />
          <Skill skillName="React Fundamentals" />
        </ul>
      </Section>
      
      <Section title="Current Goals">
        <p>Mastering React component architecture and building dynamic, interactive web applications.</p>
      </Section>
    </div>
  );
}