/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        "success-green": "#A8F86F",
        "warning-yellow": "#FFE55C",
        "error-red": "#FF4D4F",
        "sub-title-gray": "#44484C",
        "bg-login": "#3B5CA8",
        "bg-system":"#F2F5F7",
        "neutrals-200":"#A8AEB5",
        "neutrals-600":"#71787F",
        "primary-50":"#EBEFF6",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
          DEFAULT: "#3B5AA6",    
          hover: "#293F74",      
          active: "#182442",      
          disabled: "#E3E6E9",    
          foreground: '#FFFFFF', 
        },
        secondary: {
          DEFAULT: "#FFFFFF00", 
          hover: "#EBEFF6",
          active: "#B1BDDB",
          disabled: "#C7CDD3",
          border: "#3B5AA6",       
          foreground: '#3B5AA6'
        },
        primaryTab:{
          DEFAULT: "#EBEFF6",    
          hover: "#EBEFF6",  
          active: "#EBEFF6",
          disabled: "#E3E6E9",    
          foreground: '#3B5AA6',
        },
        secondaryTab:{
          DEFAULT: "#FFFFFF00", 
          hover: "#EBEFF6",
          active: "#EBEFF6",
          disabled: "#C7CDD3",
          foreground: '#3B5AA6'
        },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
      fontFamily: {
          mulish: ["Mulish", "sans-serif"],
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

