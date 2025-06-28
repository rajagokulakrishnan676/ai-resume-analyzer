import React from 'react';
import Modal from '../ui/Modal';
import { User } from 'lucide-react';

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About Me">
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md border-2 border-gray-300 dark:border-gray-600">
           <img
            src="images/mine.jpg" 
            alt="G"
            className="object-cover w-full h-full"/>
          </div>
          <h3 className="text-lg font-semibold dark:text-white">Gokulakrishnan</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Data Analyst|CyberSecurity Analyst|AI Engineer</p>
        </div>

        <div className="space-y-4">
          <section>
            <h4 className="font-medium mb-2 dark:text-white">About Me</h4>
            <p className="text-gray-600 dark:text-gray-300">
              I'm passionate about leveraging artificial intelligence to solve real-world problems. 
              With a background in machine learning and software engineering, I specialize in 
              developing AI-powered solutions that make a meaningful impact.
            </p>
          </section>

          <section>
            <h4 className="font-medium mb-2 dark:text-white">Professional Goals</h4>
            <p className="text-gray-600 dark:text-gray-300">
              My goal is to push the boundaries of AI technology while making it more accessible 
              and beneficial for everyone. I'm particularly interested in natural language 
              processing and computer vision applications.
            </p>
          </section>

          <section>
            <h4 className="font-medium mb-2 dark:text-white">What Excites Me</h4>
            <p className="text-gray-600 dark:text-gray-300">
              I'm excited by the potential of AI to transform industries and improve lives. 
              Whether it's developing smarter resume analysis tools or creating innovative 
              AI applications, I'm always eager to take on new challenges.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Want to collaborate? Feel free to reach out! rajagokulakrishnan676@gmail.com
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AboutMeModal;