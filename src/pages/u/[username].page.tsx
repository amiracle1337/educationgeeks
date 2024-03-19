import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Text, Stack, Button, Modal } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { useForm, Form, zodResolver } from "@mantine/form"
import updateProfile from "src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "src/features/users/schemas"
import { useRouter } from "next/router"
import { EditProfileForm } from "src/features/users/forms/EditProfileForm"
import { notifications } from "@mantine/notifications"
import { Routes } from "@blitzjs/next"

export const ProfilePage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const username = useStringParam("username")
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username })
  const [$updateProfile, { isLoading }] = useMutation(updateProfile, {})
  const router = useRouter()

  if (!user) return <Text>User not found :(</Text>

  const isOwner = currentUser?.id === user.id
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close(), form.reset()
        }}
        title="edit profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            await $updateProfile(values)
            const { username } = values
            if (username !== user.username) {
              if (username) {
                router.push(Routes.ProfilePage({ username }))
              }
            }
            notifications.show({
              color: "green",
              title: "Success!",
              message: "Profile updated!",
            })
            close()
          }}
          isSubmitting={isLoading}
        />
      </Modal>

      <Button>Open modal</Button>
      <Layout>
        <Stack>
          {isOwner && <Button onClick={open}>Edit your profile</Button>}
          <Text>hello {user.name}</Text>
          <Text>{user.bio}</Text>
        </Stack>
      </Layout>
    </>
  )
}

export default ProfilePage
