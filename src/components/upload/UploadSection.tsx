import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, AlertCircle, Check, Loader } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { analyzeResume, analyzeJobDescription } from '../../utils/analyzer';

const UploadSection: React.FC = () => {
  const { setResumes, setJobDescription, setActiveTab, setAnalyzing } = useAnalysis();
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const [useTextArea, setUseTextArea] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onResumesDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    setResumeFiles(prev => [...prev, ...pdfFiles]);
    setError('');
  }, []);

  const onJdDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setJdFile(acceptedFiles[0]);
      setUseTextArea(false);
      setError('');
    }
  }, []);

  const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps } = useDropzone({
    onDrop: onResumesDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const { getRootProps: getJdRootProps, getInputProps: getJdInputProps } = useDropzone({
    onDrop: onJdDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const removeResumeFile = (index: number) => {
    setResumeFiles(prev => prev.filter((_, i) => i !== index));
  };

  const resetJd = () => {
    setJdFile(null);
    setJdText('');
  };

  const handleAnalyze = async () => {
    if (resumeFiles.length === 0) {
      setError('Please upload at least one resume.');
      return;
    }

    if (!jdFile && !jdText) {
      setError('Please provide a job description.');
      return;
    }

    setLoading(true);
    setAnalyzing(true);
    setError('');

    try {
      // In a real application, we would process the PDFs on a backend
      // Here we'll simulate the analysis with our client-side utilities
      
      // First, analyze the job description
      let jobDescContent = '';
      if (jdFile) {
        // In a real app, we'd parse the PDF here
        jobDescContent = await new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve("This is a simulated job description for a Frontend Developer position. Required skills: React, TypeScript, JavaScript, HTML, CSS. Experience: 3+ years in frontend development. Education: Bachelor's degree in Computer Science or related field.");
          }, 1000);
        });
      } else {
        jobDescContent = jdText;
      }

      const analyzedJD = analyzeJobDescription(jobDescContent);
      setJobDescription(analyzedJD);

      // Then analyze each resume
      const analyzedResumes = await Promise.all(
        resumeFiles.map(async (file, index) => {
          // In a real app, we'd parse the PDF here
          const resumeContent = await new Promise<string>((resolve) => {
            setTimeout(() => {
              resolve(`This is a simulated resume for Candidate ${index + 1}. Skills: React, JavaScript, HTML, CSS${index % 2 === 0 ? ', TypeScript' : ''}, Node.js. Experience: ${2 + index} years as a Frontend Developer. Education: Bachelor's in Computer Science.`);
            }, 1500);
          });

          return analyzeResume(file.name, resumeContent, analyzedJD);
        })
      );

      setResumes(analyzedResumes);
      setSuccess(true);
      
      // Move to analysis tab after a brief delay
      setTimeout(() => {
        setActiveTab('analysis');
      }, 1500);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Upload Documents</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Upload resumes and a job description to begin the analysis.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-error-50 border-l-4 border-error-500 rounded-lg flex items-start dark:bg-error-900/20 dark:border-error-700">
          <AlertCircle className="h-5 w-5 text-error-500 mr-3 shrink-0 mt-0.5 dark:text-error-400" />
          <p className="text-error-700 dark:text-error-300">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-success-50 border-l-4 border-success-500 rounded-lg flex items-start dark:bg-success-900/20 dark:border-success-700">
          <Check className="h-5 w-5 text-success-500 mr-3 shrink-0 mt-0.5 dark:text-success-400" />
          <p className="text-success-700 dark:text-success-300">Analysis complete! Redirecting to results...</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resume Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Upload Resumes</h3>
          
          <div 
            {...getResumeRootProps()} 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-gray-50 transition dark:border-gray-600 dark:hover:bg-gray-700/50"
          >
            <input {...getResumeInputProps()} />
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2 dark:text-gray-500" />
            <p className="text-gray-600 dark:text-gray-300">Drag & drop PDF resumes here, or click to select files</p>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">PDF files only</p>
          </div>
          
          {resumeFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">Selected Resumes ({resumeFiles.length})</h4>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {resumeFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded dark:bg-gray-700">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm truncate max-w-[180px] dark:text-gray-200">{file.name}</span>
                    </div>
                    <button 
                      onClick={() => removeResumeFile(index)} 
                      className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-400"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Job Description Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Job Description</h3>
          
          {!useTextArea && !jdFile ? (
            <div 
              {...getJdRootProps()} 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-gray-50 transition dark:border-gray-600 dark:hover:bg-gray-700/50"
            >
              <input {...getJdInputProps()} />
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2 dark:text-gray-500" />
              <p className="text-gray-600 dark:text-gray-300">Drag & drop job description file here, or click to select</p>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">PDF or TXT files</p>
            </div>
          ) : null}
          
          {!useTextArea && jdFile ? (
            <div className="mb-4">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded dark:bg-gray-700">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-primary-500 mr-2" />
                  <span className="text-sm truncate max-w-[240px] dark:text-gray-200">{jdFile.name}</span>
                </div>
                <button 
                  onClick={resetJd} 
                  className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-400"
                >
                  ×
                </button>
              </div>
            </div>
          ) : null}
          
          <div className="mb-4">
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setUseTextArea(!useTextArea);
                  if (jdFile) resetJd();
                }}
                className="text-primary-600 text-sm hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {useTextArea ? "Upload a file instead" : "Enter job description manually"}
              </button>
            </div>
          </div>
          
          {useTextArea && (
            <div className="mb-4">
              <textarea
                placeholder="Paste or type job description here..."
                className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium flex items-center hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2 h-5 w-5" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze Documents
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;