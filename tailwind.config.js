/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
      backgroundImage: {
        "gradient-default": "linear-gradient(135deg, #ff7e5f, #feb47b)",
        "card-active": "linear-gradient(180deg, #5BE2F7 0%, #50DDA0 99.99%)",
        "card-disactive":
          "linear-gradient(0deg, rgba(168,161,161,0.4), rgba(168,161,161,0.4)), linear-gradient(180deg, #5BE2F7 0%, #50DDA0 99.99%)",
        "card-faint" : "linear-gradient(180deg, rgba(247, 91, 91, 0.6) 0%, rgba(221, 113, 80, 0.5) 99.99%, rgba(215, 186, 69, 0.2) 100%)",

      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        "success-green": "#51FF4E",
        "warning-yellow": "#FFF94E",
        "error-red": "#FF3131",
        "sub-title-gray": "#44484C",
        "bg-login": "#3B5CA8",
        "bg-system":"#F2F5F7",
        "neutrals-100":"#F2F5F7",
        "neutrals-200":"#A8AEB5",
        "neutrals-600":"#71787F",
        "primary-50":"#EBEFF6",
        "catch-button" :"#F2F5F7",
        "linear-gradient-start" : "#5BE2F7", 
        "linear-gradient-end" : "#50DDA0",
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
      },
      keyframes: {
        shake: {
          '0%, 100%': { '--tw-translate-x': '0px' },
          '10%, 30%, 50%, 70%, 90%': { '--tw-translate-x': '-5px' },
          '20%, 40%, 60%, 80%': { '--tw-translate-x': '5px' },
        },
      },
      animation: {
        shake: 'shake 1s ease-in-out',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

