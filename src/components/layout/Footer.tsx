
import { Link } from "react-router-dom";
import { Github, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img src="/images/truckwise-logo.svg" alt="TruckWise Logo" className="h-10 w-auto" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Optimizing routes and ensuring compliance for truck drivers across Sweden.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Route Optimization
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Compliance Tracking
                </Link>
              </li>
              <li>
                <Link to="/updates" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Weather & Road Updates
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  Profile & Settings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@truckwise.se" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@truckwise.se
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat Support
                </a>
              </li>
              <li>
                <a href="https://github.com/truckwise" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TruckWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
