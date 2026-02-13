// Gestion de la navigation
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Fonction pour changer de section
    function showSection(sectionId) {
        // Masquer toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section sélectionnée
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            
            // Animation d'entrée
            activeSection.style.opacity = '0';
            activeSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeSection.style.transition = 'opacity 0.5s, transform 0.5s';
                activeSection.style.opacity = '1';
                activeSection.style.transform = 'translateY(0)';
            }, 10);
        }
        
        // Fermer le menu mobile s'il est ouvert
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
    
    // Écouteurs d'événements pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID de la section cible
            const sectionId = this.getAttribute('href').substring(1);
            
            // Animation du lien cliqué
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Afficher la section
            showSection(sectionId);
            
            // Mettre à jour l'état actif des liens
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Gestion du menu mobile
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animation de l'icône du menu
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Animation 3D de la photo au survol
    const photo3d = document.querySelector('.photo-3d');
    if (photo3d) {
        photo3d.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(10px)`;
        });
        
        photo3d.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s';
            this.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(10px)';
            
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    }
