import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">Login</h1>
      {/* Login form goes here */}
    </motion.div>
  );
};

export default Login;