import { Text } from "@mantine/core"
import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import { useStringQueryParam } from "src/utils/utils"
import { useQuery } from "@blitzjs/rpc"
import verifyUserToken from "src/features/auth/queries/verifyUserToken"
import Layout from "src/core/layouts/Layout"

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [result, { isSuccess, error }] = useQuery(
    verifyUserToken,
    { token: token as any },
    { enabled: !!token }
  )
  return (
    <Stack>
      <>
        {result && isSuccess && <Text>Your email is verified!</Text>}
        {error && <Text>Invalid token</Text>}
      </>
    </Stack>
  )
}

export default VerifyEmailPage
