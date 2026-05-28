import React from 'react';
import { useLang } from '../context/LangContext';
import '../styles/About.css';

const teamMembers = [
  {
    nameKey: 'member1Name',
    roleKey: 'member1Role',
    bioKey: 'member1Bio',
    avatar: 'A',
    color: '#e8a020'
  },
  {
    nameKey: 'member2Name',
    roleKey: 'member2Role',
    bioKey: 'member2Bio',
    avatar: 'I',
    color: '#e74c3c'
  },
  {
    nameKey: 'member3Name',
    roleKey: 'member3Role',
    bioKey: 'member3Bio',
    avatar: 'D',
    color: '#3498db'
  }
];

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="about-page">
      {/* HEADER */}
      <div className="page-header">
        <div className="container">
          <div className="page-header-content fade-up">
            <h1>{a.title}</h1>
            <p>{a.subtitle}</p>
            <span className="accent-line" />
          </div>
        </div>
      </div>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text fade-up">
              <h2>{a.story}</h2>
              <span className="accent-line" style={{ margin: '16px 0', display: 'block' }} />
              <p>{a.storyText}</p>
              <div className="story-highlights">
                <div className="highlight">
                  <strong>2004</strong>
                  <span>{a.founded}</span>
                </div>
                <div className="highlight">
                  <strong>5000+</strong>
                  <span>{a.clients}</span>
                </div>
                <div className="highlight">
                  <strong>100%</strong>
                  <span>{a.satisfaction}</span>
                </div>
              </div>
            </div>
            <div className="story-image fade-up fade-up-2">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80"
                alt="Workshop"
              />
              <div className="image-badge">
                <span>20+</span>
                <span>{a.yearsExp}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-visual fade-up">
              <div className="mission-icon"></div>
            </div>
            <div className="mission-content fade-up fade-up-2">
              <h2>{a.mission}</h2>
              <p>{a.missionText}</p>
              <ul className="mission-list">
                <li>—{a.warranty}</li>
                <li>—{a.freeCheck}</li>
                <li>—{a.origParts}</li>
                <li>—{a.quickService}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <h2>{a.team}</h2>
            <span className="accent-line" />
          </div>
          <div className="team-grid">
            {teamMembers.map((m, i) => (
              <div key={i} className="team-card card fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="team-avatar" style={{ background: m.color }}>
                  {m.avatar}
                </div>
                <h3>{a[m.nameKey]}</h3>
                <span className="team-role">{a[m.roleKey]}</span>
                <p>{a[m.bioKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section certs-section">
        <div className="container">
          <div className="section-header">
            <h2>{a.certTitle}</h2>
            <span className="accent-line" />
          </div>
          <div className="certs-grid">
            {['BMW Group', 'Audi AG', 'Mercedes-Benz', 'Alpine Electronics', 'Pioneer', 'Sony Car Audio', 'JVC Kenwood', 'Harman Kardon'].map((c, i) => (
              <div key={i} className="cert-tag fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <span></span>{c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}