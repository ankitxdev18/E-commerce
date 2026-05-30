import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  deleteUser,
  logoutUser,
  updateUser,
} from "../store/slices/userSlice";
import { User, Mail, Lock, LogOut, Trash2, Save } from "lucide-react";
import { Button, Input, Divider } from "../components/ui/Base";
import { Spinner } from "../components/ui/Animations";

const ModernSettings = () => {
  const { user, status } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = (data) => {
    dispatch(updateUser({ id: user.id, updates: { ...user, ...data } }));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      dispatch(deleteUser(user.id));
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900">
            Account Settings
          </h1>
          <p className="text-neutral-600 mt-2">
            Manage your profile and account preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
          >
            {/* Profile Header */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800" />

            {/* Profile Content */}
            <div className="px-6 py-8 -mt-16 relative">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-white flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </motion.div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                {user?.username}
              </h2>
              <p className="text-neutral-600 mb-6">{user?.email}</p>

              {user?.isAdmin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  👑 Administrator
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Edit Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <User size={24} className="text-blue-600" />
              Edit Profile
            </h3>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-5">
              <Input
                label="Username"
                type="text"
                placeholder="your username"
                {...register("username")}
              />

              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2"
              >
                {status === "loading" && <Spinner size="sm" />}
                <Save size={20} />
                {status === "loading" ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </motion.div>

          <Divider />

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <Lock size={24} className="text-blue-600" />
              Security
            </h3>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <p className="font-medium text-neutral-900">Two-Factor Authentication</p>
                <p className="text-sm text-neutral-600">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Enable 2FA
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <p className="font-medium text-neutral-900">
                  Connected Devices
                </p>
                <p className="text-sm text-neutral-600">
                  Manage devices that have access to your account
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  View Devices
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <Divider />

          {/* Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Logout Button */}
            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleLogout}
              className="w-full p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-900 flex items-center gap-2">
                    <LogOut size={20} className="text-blue-600" />
                    Logout
                  </p>
                  <p className="text-sm text-neutral-600">
                    Sign out of your account
                  </p>
                </div>
                <span className="text-blue-600 text-xl">→</span>
              </div>
            </motion.button>

            {/* Delete Account Button */}
            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleDeleteAccount}
              className="w-full p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-900 flex items-center gap-2">
                    <Trash2 size={20} className="text-red-600" />
                    Delete Account
                  </p>
                  <p className="text-sm text-neutral-600">
                    Permanently delete your account and all data
                  </p>
                </div>
                <span className="text-red-600 text-xl">→</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernSettings;
