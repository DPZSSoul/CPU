/**
 * App - PC Learning Platform
 * Routes: Learn (deep), Diagnose, Build (pro), Quiz, Technician Thinking
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import HomePage from './components/HomePage'

// Mode 1: Learn
import LearnLayout from './components/Learn/LearnLayout'
import LearnIndex from './components/Learn/LearnIndex'
import DeepPartModule from './components/Learn/DeepPartModule'

// Mode 2: Diagnose
import DiagnoseSimulator from './components/Diagnose/DiagnoseSimulator'

// Mode 3: Professional Build
import ProfessionalBuild from './components/Build/ProfessionalBuild'

// Mode 4: Quiz
import QuizIndex from './components/Quiz/QuizIndex'
import QuizRunner from './components/Quiz/QuizRunner'
import BuildChecklist from './components/Capstone/BuildChecklist'

// Mode 5: Technician Thinking
import TechnicianThinking from './components/Thinking/TechnicianThinking'

// Progress Dashboard
import ProgressDashboard from './components/Dashboard/ProgressDashboard'

// Resources & What If
import ResourcesPage from './components/Resources/ResourcesPage'
import WhatIfScenarios from './components/WhatIf/WhatIfScenarios'

// Extras
import MythVsFact from './components/Extras/MythVsFact'
import Pronunciation from './components/Extras/Pronunciation'
import FlashCards from './components/Extras/FlashCards'
import SlangDecoder from './components/Extras/SlangDecoder'
import PhotoQuiz from './components/Extras/PhotoQuiz'
import DreamPC from './components/Extras/DreamPC'
import ShoppingChecklist from './components/Extras/ShoppingChecklist'

function App() {
  const [languageMode, setLanguageMode] = useState('beginner')

  return (
    <BrowserRouter>
      <Layout languageMode={languageMode} setLanguageMode={setLanguageMode}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Mode 1: Learn the Parts */}
          <Route path="/learn" element={
            <LearnLayout>
              <LearnIndex />
            </LearnLayout>
          } />
          <Route path="/learn/:partId" element={
            <LearnLayout>
              <DeepPartModule languageMode={languageMode} />
            </LearnLayout>
          } />

          {/* Mode 2: Diagnose Simulator */}
          <Route path="/diagnose" element={<DiagnoseSimulator />} />

          {/* Mode 3: Professional Build */}
          <Route path="/build-pro" element={<ProfessionalBuild />} />

          {/* Mode 4: Quiz */}
          <Route path="/quiz" element={<QuizIndex />} />
          <Route path="/quiz/:topicId" element={<QuizRunner />} />
          <Route path="/capstone" element={<BuildChecklist />} />

          {/* Mode 5: Technician Thinking */}
          <Route path="/thinking" element={<TechnicianThinking />} />

          {/* Progress Dashboard */}
          <Route path="/dashboard" element={<ProgressDashboard />} />

          {/* Resources & What If */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/what-if" element={<WhatIfScenarios />} />

          {/* Extras */}
          <Route path="/myths" element={<MythVsFact />} />
          <Route path="/pronunciation" element={<Pronunciation />} />
          <Route path="/flash-cards" element={<FlashCards />} />
          <Route path="/slang" element={<SlangDecoder />} />
          <Route path="/photo-quiz" element={<PhotoQuiz />} />
          <Route path="/build-dream" element={<DreamPC />} />
          <Route path="/shopping-checklist" element={<ShoppingChecklist />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
