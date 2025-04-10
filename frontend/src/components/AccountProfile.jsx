import React, { useState } from 'react';
import { 
  CookingThemedCard, 
  DecorativeCorner, 
  CookingBadge,
  EggIcon,
  StarIcon,
  HerbIcon,
  CupcakeIcon,
  WhiskIcon
} from './CookingIcons';

const AccountProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <ProfileCard />
            
            <div className="mt-6 bg-gray-800 rounded-lg border border-amber-700/30 overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-amber-100">Account Navigation</h3>
              </div>
              
              <div className="divide-y divide-gray-700">
                <NavItem 
                  icon={<EggIcon size={20} />}
                  label="Profile Settings"
                  isActive={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
                />
                <NavItem 
                  icon={<StarIcon size={20} />}
                  label="Organization"
                  isActive={activeTab === 'organization'}
                  onClick={() => setActiveTab('organization')}
                />
                <NavItem 
                  icon={<HerbIcon size={20} />}
                  label="Preferences"
                  isActive={activeTab === 'preferences'}
                  onClick={() => setActiveTab('preferences')}
                />
                <NavItem 
                  icon={<CupcakeIcon size={20} />}
                  label="Saved Recipes"
                  isActive={activeTab === 'saved'}
                  onClick={() => setActiveTab('saved')}
                />
                <NavItem 
                  icon={<WhiskIcon size={20} />}
                  label="Account Security"
                  isActive={activeTab === 'security'}
                  onClick={() => setActiveTab('security')}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <CookingThemedCard
                icon="ai"
                title="AI Personalization"
                subtitle="Your cooking preferences power our AI recommendations"
              >
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Recipe Suggestions</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="toggle-ai-recipes" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                      <div className="absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Cooking Tips</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="toggle-ai-tips" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                      <div className="absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Substitution Analysis</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" id="toggle-ai-subs" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                      <div className="absolute w-3 h-3 bg-white rounded-full left-1 top-1 peer-checked:left-6 transition-all"></div>
                    </div>
                  </div>
                </div>
              </CookingThemedCard>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full md:w-2/3">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'organization' && <OrganizationSettings />}
            {activeTab === 'preferences' && <PreferencesSettings />}
            {activeTab === 'saved' && <SavedRecipes />}
            {activeTab === 'security' && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <div className="relative bg-gray-800 rounded-lg border border-amber-700/30 p-6 shadow-lg overflow-hidden">
      <DecorativeCorner position="top-right" />
      <DecorativeCorner position="bottom-left" />
      
      <div className="flex items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-amber-700/30 flex items-center justify-center overflow-hidden">
            <span className="text-3xl text-amber-300 font-bold">M</span>
          </div>
          <div className="absolute bottom-0 right-0 bg-amber-600 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </div>
        
        <div className="ml-4">
          <h2 className="text-xl font-bold text-amber-100">Michael Cox</h2>
          <p className="text-gray-400">mfcoxjr@gmail.com</p>
          <div className="mt-2 flex space-x-2">
            <CookingBadge text="Premium" icon="star" className="bg-amber-900/50" />
            <CookingBadge text="Chef Level 3" icon="whisk" className="bg-gray-700" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-amber-300 font-medium">Culinary Solutions Inc.</h3>
            <p className="text-sm text-gray-400">Organization Admin</p>
          </div>
          <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className={`w-full flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors ${
        isActive ? 'bg-amber-900/20 border-l-2 border-amber-500' : ''
      }`}
      onClick={onClick}
    >
      <span className={`mr-3 ${isActive ? 'text-amber-400' : 'text-gray-400'}`}>
        {icon}
      </span>
      <span className={isActive ? 'text-amber-100' : 'text-gray-300'}>
        {label}
      </span>
    </button>
  );
};

const ProfileSettings = () => {
  return (
    <div>
      <div className="bg-gray-800 rounded-lg border border-amber-700/30 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-amber-100">Profile Settings</h2>
          <p className="text-gray-400">Manage your personal information and preferences</p>
        </div>
        
        <div className="p-6">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input 
                  id="first-name" 
                  type="text" 
                  defaultValue="Michael"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input 
                  id="last-name" 
                  type="text" 
                  defaultValue="Cox"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input 
                id="email" 
                type="email" 
                defaultValue="mfcoxjr@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-amber-200 text-sm font-medium mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea 
                id="bio" 
                rows="4"
                defaultValue="Home cook with a passion for Italian cuisine and baking. Always looking for new recipes to try on weekends."
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-800 rounded-lg border border-amber-700/30 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-amber-100">Cooking Preferences</h2>
          <p className="text-gray-400">Tell us about your cooking style and dietary needs</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-amber-200 text-sm font-medium mb-3">Dietary Restrictions</h3>
            <div className="flex flex-wrap gap-2">
              <DietaryTag label="Vegetarian" />
              <DietaryTag label="Gluten-Free" isSelected />
              <DietaryTag label="Dairy-Free" />
              <DietaryTag label="Vegan" />
              <DietaryTag label="Keto" />
              <DietaryTag label="Paleo" />
              <DietaryTag label="Low Sodium" isSelected />
              <DietaryTag label="Nut-Free" />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-amber-200 text-sm font-medium mb-3">Cuisine Preferences</h3>
            <div className="flex flex-wrap gap-2">
              <DietaryTag label="Italian" isSelected />
              <DietaryTag label="Mexican" />
              <DietaryTag label="Chinese" />
              <DietaryTag label="Indian" />
              <DietaryTag label="Thai" isSelected />
              <DietaryTag label="Mediterranean" isSelected />
              <DietaryTag label="American" />
              <DietaryTag label="French" />
              <DietaryTag label="Japanese" />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-amber-200 text-sm font-medium mb-3">Cooking Skill Level</h3>
            <div className="flex items-center space-x-2">
              <input type="range" min="1" max="5" defaultValue="3" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
              <span className="text-amber-300 font-medium">3</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DietaryTag = ({ label, isSelected = false }) => {
  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
      isSelected 
        ? 'bg-amber-600 text-white' 
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}>
      {label}
    </div>
  );
};

const OrganizationSettings = () => {
  return (
    <div className="bg-gray-800 rounded-lg border border-amber-700/30 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-amber-100">Organization</h2>
            <p className="text-gray-400">Manage your organization settings and members</p>
          </div>
          <CookingBadge text="Admin" icon="star" className="bg-amber-900/50" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-700/30 flex items-center justify-center mr-4">
              <span className="text-xl text-amber-300 font-bold">CS</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-100">Culinary Solutions Inc.</h3>
              <p className="text-gray-400">Enterprise Plan · 25 members</p>
            </div>
            <button className="ml-auto text-sm text-amber-400 hover:text-amber-300 transition-colors">
              Edit
            </button>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-300">
              Your organization allows recipe sharing and collaboration among team members. 
              As an admin, you can manage members and control access to recipes.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-amber-100 mb-4">Team Members</h3>
          
          <div className="bg-gray-700/30 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-3 border-b border-gray-700 text-sm font-medium text-gray-400">
              <div className="col-span-5">Name</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-1"></div>
            </div>
            
            <div className="divide-y divide-gray-700">
              <TeamMember 
                name="Michael Cox" 
                email="mfcoxjr@gmail.com" 
                role="Admin" 
                isCurrentUser={true}
              />
              <TeamMember 
                name="Sarah Johnson" 
                email="sarah.j@culinarysolutions.com" 
                role="Admin" 
              />
              <TeamMember 
                name="David Lee" 
                email="david.l@culinarysolutions.com" 
                role="Member" 
              />
              <TeamMember 
                name="Emily Chen" 
                email="emily.c@culinarysolutions.com" 
                role="Member" 
              />
              <TeamMember 
                name="Robert Kim" 
                email="robert.k@culinarysolutions.com" 
                role="Member" 
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors">
              Invite New Member
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-amber-100 mb-4">Organization Settings</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-amber-200 font-medium">Recipe Sharing</h4>
                <p className="text-sm text-gray-400">Allow members to share recipes with each other</p>
              </div>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="toggle-sharing" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-amber-200 font-medium">Private Recipes</h4>
                <p className="text-sm text-gray-400">Allow members to create private recipes</p>
              </div>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="toggle-private" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <div>
                <h4 className="text-amber-200 font-medium">Recipe Approval</h4>
                <p className="text-sm text-gray-400">Require admin approval for new shared recipes</p>
              </div>
              <div className="relative inline-block w-12 align-middle select-none">
                <input type="checkbox" id="toggle-approval" className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-amber-600"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMember = ({ name, email, role, isCurrentUser = false }) => {
  return (
    <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-700/50 transition-colors">
      <div className="col-span-5 flex items-center">
        <div className="w-8 h-8 rounded-full bg-amber-700/30 flex items-center justify-center mr-3">
          <span className="text-sm text-amber-300 font-bold">{name.charAt(0)}</span>
        </div>
        <span className="text-gray-200">
          {name}
          {isCurrentUser && <span className="ml-2 text-xs text-gray-400">(You)</span>}
        </span>
      </div>
      <div className="col-span-4 text-gray-400">{email}</div>
      <div className="col-span-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          role === 'Admin' ? 'bg-amber-900/50 text-amber-300' : 'bg-gray-700 text-gray-300'
        }`}>
          {role}
        </span>
      </div>
      <div className="col-span-1 text-right">
        <button className="text-gray-400 hover:text-amber-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other tabs
const PreferencesSettings = () => (
  <div className="bg-gray-800 rounded-lg border border-amber-700/30 p-6">
    <h2 className="text-2xl font-bold text-amber-100 mb-4">Cooking Preferences</h2>
    <p className="text-gray-300">This section allows you to customize your cooking experience.</p>
  </div>
);

const SavedRecipes = () => (
  <div className="bg-gray-800 rounded-lg border border-amber-700/30 p-6">
    <h2 className="text-2xl font-bold text-amber-100 mb-4">Saved Recipes</h2>
    <p className="text-gray-300">View and manage your saved recipes.</p>
  </div>
);

const SecuritySettings = () => (
  <div className="bg-gray-800 rounded-lg border border-amber-700/30 p-6">
    <h2 className="text-2xl font-bold text-amber-100 mb-4">Account Security</h2>
    <p className="text-gray-300">Manage your account security settings.</p>
  </div>
);

export default AccountProfile;
