export default function isAdmin ({ $auth }) {
  if ($auth.user.roleId !== '1') { $auth.redirect('home') }
}