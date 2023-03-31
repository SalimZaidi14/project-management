import React from 'react';

import Clients from '../components/Clients';
import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
    return (
        <>
            <h4>Clients</h4>
            <Clients />
            <AddClientModal />
            <h4>Projects</h4>
            <Projects />
            <AddProjectModal />
        </>
    )
}
