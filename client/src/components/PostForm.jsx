import React, { useState } from 'react';

const PostForm = () => {
  // Array of legal hashtags
  const legalHashtags = [
    "#LegalAdvice", "#LegalIssues", "#KnowYourRights", "#JusticeForAll", "#LegalHelp", "#LawFirm", "#LegalServices", "#LegalSupport",
    "#CriminalLaw", "#DefenseAttorney", "#LegalDefense", "#DUI", "#DrugCharges", "#Felony", "#Misdemeanor", "#WhiteCollarCrime",
    "#FamilyLaw", "#Divorce", "#ChildCustody", "#ChildSupport", "#DivorceLawyer", "#FamilyCourt", "#DomesticViolence", "#Alimony",
    "#EmploymentLaw", "#WorkplaceRights", "#WrongfulTermination", "#Discrimination", "#Harassment", "#LaborLaw", "#EqualPay", "#EmployeeRights",
    "#PersonalInjury", "#InjuryLawyer", "#CarAccident", "#SlipAndFall", "#MedicalMalpractice", "#WorkersCompensation", "#ProductLiability", "#AccidentAttorney",
    "#ImmigrationLaw", "#VisaApplication", "#GreenCard", "#Asylum", "#Citizenship", "#DACA", "#DeportationDefense", "#ImmigrationReform",
    "#IPLaw", "#Copyright", "#Trademark", "#PatentLaw", "#IntellectualProperty", "#TradeSecrets", "#BrandProtection", "#Infringement",
    "#BusinessLaw", "#CorporateLaw", "#ContractLaw", "#MergersAndAcquisitions", "#LLC", "#StartupLaw", "#BusinessFormation", "#BusinessContracts",
    "#RealEstateLaw", "#PropertyLaw", "#TenantRights", "#LandlordRights", "#Eviction", "#Zoning", "#PropertyDisputes", "#Foreclosure",
    "#TaxLaw", "#TaxAttorney", "#IRS", "#TaxAudit", "#EstateTax", "#IncomeTax", "#CorporateTax", "#TaxRelief",
    "#EstatePlanning", "#WillsAndTrusts", "#Probate", "#Inheritance", "#TrustLaw", "#Guardianship", "#LivingWill", "#AssetProtection",
    "#CivilRights", "#DisabilityRights", "#EqualProtection", "#FreeSpeech", "#HumanRights", "#PoliceBrutality", "#CivilLiberties", "#RacialJustice"
  ];

  // State management
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Filter hashtags based on search input
  const filteredHashtags = legalHashtags.filter(hashtag => {
    const searchTerm = searchInput.startsWith('#') ? searchInput : '#' + searchInput;
    return hashtag.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle hashtag selection from dropdown
  const handleHashtagSelect = (e) => {
    const hashtag = e.target.value;
    if (hashtag && !selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
      setSelectedOption(''); // Reset selection after adding
    } else if (hashtag) {
      alert("This hashtag is already selected.");
    }
  };

  // Remove hashtag from selection
  const removeHashtag = (hashtagToRemove) => {
    setSelectedHashtags(selectedHashtags.filter(hashtag => hashtag !== hashtagToRemove));
  };

  // Handle form submission and download JSON
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Check for missing fields and display appropriate error message
    if (!title) {
      setErrorMessage("Title is required.");
      return;
    }
    if (selectedHashtags.length === 0) {
      setErrorMessage("At least one hashtag is required.");
      return;
    }
    if (!postContent) {
      setErrorMessage("Post content is required.");
      return;
    }

    // Clear any existing error message
    setErrorMessage('');

    // Create the post data object with only the first letter of keys capitalized
    const postData = {
      Title: title,
      Tags: selectedHashtags,
      Content: postContent
    };

    // Create a Blob from the JSON data
    const jsonBlob = new Blob([JSON.stringify(postData, null, 2)], {
      type: 'application/json'
    });

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    //link.download = 'post_data.json'; // Set the default filename
    //link.click(); // Trigger the download

    // Log the post data for debugging (optional)
    console.log('Submitting post:', JSON.stringify(postData));

    // Clear the form after submission
    setTitle('');
    setPostContent('');
    setSelectedHashtags([]);
    setSearchInput('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Make a Post</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        {/* Error Popup */}
        {errorMessage && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-red-600 font-bold">{errorMessage}</p>
              <button
                onClick={() => setErrorMessage('')}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title Row */}
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/4 md:pr-4 mb-2 md:mb-0">
              <label htmlFor="title" className="block py-3">
                Title
              </label>
            </div>
            <div className="w-full md:w-3/4">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title.."
                className="w-full p-3 border rounded"
              />
            </div>
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/4 md:pr-4 mb-2 md:mb-0">
              <label className="block py-3">
                Tags
              </label>
            </div>
            <div className="w-full md:w-3/4">
              {/* Search Input */}
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for hashtags..."
                className="w-full p-3 border rounded mb-2"
              />
              
              {/* Hashtag Dropdown */}
              <select
                size={6}
                onChange={handleHashtagSelect}
                value={selectedOption}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select a hashtag</option>
                {filteredHashtags.map((hashtag) => (
                  <option
                    key={hashtag}
                    value={hashtag}
                    disabled={selectedHashtags.includes(hashtag)}
                    className={`p-2 ${selectedHashtags.includes(hashtag) ? 'text-gray-400 bg-gray-100' : ''}`}
                  >
                    {hashtag}
                  </option>
                ))}
              </select>

              {/* Selected Hashtags Display */}
              <div className="mt-2">
                <ul className="space-y-2">
                  {selectedHashtags.map((hashtag) => (
                    <li
                      key={hashtag}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      {hashtag}
                      <button
                        type="button"
                        onClick={() => removeHashtag(hashtag)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Post Content Row */}
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/4 md:pr-4 mb-2 md:mb-0">
              <label htmlFor="post" className="block py-3">
                Your Post
              </label>
            </div>
            <div className="w-full md:w-3/4">
              <textarea
                id="post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post content..."
                rows="4"
                className="w-full p-3 border rounded"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;